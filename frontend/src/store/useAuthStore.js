 import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast'
import {io} from "socket.io-client"




const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
 export const useAuthStore = create((set, get) => ({
   authUser: null,
   isSigningUp: false,
   isLogging: false,
   isUpdatingProfile: false,

   isCheckingAuth: true,
   onlineUsers: [],
   checkAuth: async () => {
     try {
       const res = await axiosInstance.get("/auth/check");
       set({ authUser: res.data });
       get().connectedSocket();
     } catch (error) {
       console.log("Error in checkAuth:", error);
       set({ authUser: null });
     } finally {
       set({ isCheckingAuth: false });
     }
   },
   signup: async (data) => {
     set({ isSigningUp: true });
     try {
       const res = await axiosInstance.post("/auth/sign-up", data);
       set({ authUser: res.data });
       toast.success("Account created Successfully");
       get().connectedSocket()
     } catch (error) {
       toast.error(error.response.data.message);
     } finally {
       set({ isSigningUp: false });
     }
   },
   login: async (data) => {
     set({ isLogging: true });
     try {
       const res = await axiosInstance.post("/auth/log-in", data);
       set({ authUser: res.data });
       toast.success("Logged in successfully");
       get().connectedSocket();
     } catch (error) {
       toast.error(error.response.message);
     } finally {
       set({ isLogging: false });
     }
   },
   logout: async () => {
     try {
       await axiosInstance.post("/auth/log-out");
       set({ authUser: null });
       toast.success("Logged out successfully ");
       get().disconnectedSocket();
     } catch (error) {
       toast.error(error.response.message);
     }
   },

   updateProfile: async (data) => {
     set({ isUpdatingProfile: true });
     try {
       const res = await axiosInstance.post("/auth/update-profile", data);
       set({ authUser: res.data });
       toast.success("profile updated successfully");
     } catch (error) {
       console.log("error in update profile", error);
       toast.error(error.response.data.message);
     } finally {
       set({ isUpdatingProfile: false });
     }
   },
   connectedSocket: () => {
    const {authUser}=get();
    if(!authUser || get().socket?.connected)return;
    const socket = io(BASE_URL,{
      query: {userId : authUser._id,}
    });
    socket.connect();
    set({socket: socket});
    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers: userIds})
    })
   },
   disconnectedSocket: () => {
    if(get().socket?.connected) get().socket.disconnect()
   },
 }));
