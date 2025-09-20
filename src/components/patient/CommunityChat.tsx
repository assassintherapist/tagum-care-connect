import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Users } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  userType: "patient" | "admin";
  isAnonymous?: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    username: "HealthAdvisor_CHO",
    message: "Welcome to the HIV Care Community Chat. This is a safe space for support and information sharing.",
    timestamp: new Date(Date.now() - 60000 * 30),
    userType: "admin"
  },
  {
    id: "2",
    username: "CareSupport_RSC",
    message: "Remember that all conversations here are confidential. Feel free to ask questions or share experiences.",
    timestamp: new Date(Date.now() - 60000 * 25),
    userType: "admin"
  },
  {
    id: "3",
    username: "Phoenix2024",
    message: "Thank you for the welcoming environment. It means a lot to have this support.",
    timestamp: new Date(Date.now() - 60000 * 20),
    userType: "patient",
    isAnonymous: true
  }
];

export const CommunityChat = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("communityMessages");
    return saved ? JSON.parse(saved) : initialMessages;
  });
  const [newMessage, setNewMessage] = useState("");
  const [currentUser] = useState(() => {
    const saved = localStorage.getItem("currentChatUser");
    return saved || `User${Math.floor(Math.random() * 1000)}`;
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("communityMessages", JSON.stringify(messages));
    localStorage.setItem("currentChatUser", currentUser);
  }, [messages, currentUser]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      username: currentUser,
      message: newMessage.trim(),
      timestamp: new Date(),
      userType: "patient",
      isAnonymous: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const getUserBadgeColor = (userType: string, isAnonymous?: boolean) => {
    if (userType === "admin") return "bg-primary text-primary-foreground";
    if (isAnonymous) return "bg-secondary text-secondary-foreground";
    return "bg-muted text-muted-foreground";
  };

  const getUserDisplayName = (username: string, userType: string) => {
    if (userType === "admin") {
      if (username.includes("CHO")) return "CHO Health Advisor";
      if (username.includes("RSC")) return "Red Star Clinic Support";
      return "Health Support";
    }
    return username;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Community Support Chat</h2>
        <p className="text-muted-foreground">Connect with peers and healthcare professionals in a safe environment</p>
      </div>

      <Card className="medical-card h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-primary">
            <MessageCircle className="w-5 h-5" />
            Live Chat
            <Badge variant="secondary" className="ml-auto">
              <Users className="w-3 h-3 mr-1" />
              {messages.filter(m => m.timestamp > new Date(Date.now() - 24*60*60*1000)).length} active today
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className={getUserBadgeColor(msg.userType, msg.isAnonymous)}>
                      {msg.userType === "admin" ? "🏥" : "👤"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {getUserDisplayName(msg.username, msg.userType)}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getUserBadgeColor(msg.userType, msg.isAnonymous)}`}
                      >
                        {msg.userType === "admin" ? "Healthcare Professional" : "Community Member"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(msg.timestamp, "HH:mm")}
                      </span>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message... (anonymous)"
                className="flex-1"
              />
              <Button type="submit" size="sm" className="bg-primary hover:bg-primary-hover">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              Your messages will be posted anonymously. Please be respectful and supportive.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chat Guidelines */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-accent">Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>All conversations are anonymous and confidential</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Be respectful, supportive, and kind to all community members</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Share experiences and ask questions freely in this safe space</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Healthcare professionals are available to provide guidance</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>For medical emergencies, please contact your healthcare provider directly</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};