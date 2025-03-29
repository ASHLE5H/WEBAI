"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ArrowRight, Link } from "lucide-react";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";

function ChatView() {
    const { id } = useParams();
    const convex = useConvex();
    const { messages, setMessages } = useContext(MessagesContext);
    const { userDetail } = useContext(UserDetailContext);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        if (id) {
            GetWorkspaceData();
        }
    }, [id]);

    const GetWorkspaceData = async () => {
        try {
            const result = await convex.query(api.workspace.GetWorkspace, {
                workspaceId: id,
            });
            setMessages(result?.messages || []); // Ensure messages is an array
            console.log(result);
        } catch (error) {
            console.error("Error fetching workspace data:", error);
        }
    };

    useEffect(() => {
        if (messages?.length > 0) {
            const role = messages[messages.length - 1].role;
            if (role === "user") {
                GetAiResponse();
            }
        }
    }, [messages]);

    // const GetAiResponse = async () => {
    //     try {
    //         const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    //         const result = await axios.post("/api/ai-chat", {
    //             prompt: PROMPT,
    //         });
    //         console.log(result.data.result);
    //     } catch (error) {
    //         console.error("Error in GetAiResponse:", error);
    //     }
    // };

    const handleGenerate = async () => {
        if (!userInput.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: userInput }]);
        setUserInput(""); // Clear input after sending
    };

    return (
        <div className="relative h-[85vh] flex flex-col">
            <div className="flex-1 overflow-y-scroll">
                {Array.isArray(messages) &&
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
                            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
                        >
                            {msg?.role === "user" && userDetail?.picture && (
                                <Image
                                    src={userDetail.picture}
                                    alt="userImage"
                                    width={35}
                                    height={35}
                                    className="rounded-full"
                                />
                            )}
                            <h2>{msg.content}</h2>
                        </div>
                    ))}
            </div>

            <div
                className="p-5 border rounded-xl max-w-xl w-full mt-3"
                style={{
                    backgroundColor: Colors.BACKGROUND,
                }}
            >
                <div className="flex gap-2">
                    <textarea
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                    />
                    {userInput && (
                        <ArrowRight
                            onClick={handleGenerate}
                            className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
                        />
                    )}
                </div>
                <div>
                    <Link className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

export default ChatView;
