import React from "react";
import ChatView from "@/components/custom/ChatView";

 // ✅ Make sure the path is correct
import CodeView from "@/components/custom/CodeView"; // ✅ Ensure the correct import

function Workspace() {
    return (
        <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <ChatView /> 
                <div className="col-span-2">
                <CodeView /> 
                </div>
            </div>
        </div>
    );
}

export default Workspace;
