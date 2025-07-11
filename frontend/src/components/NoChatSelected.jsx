import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/60">
      <div className=" max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-14 flex animate-bounce justify-center bg-primary-300 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to F1!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected