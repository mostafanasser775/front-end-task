import { Button } from "@heroui/button";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export function LinkSBTNS() {
    return (
        <div className="flex items-center justify-between my-4">
            <div className="flex space-x-4">
                <Button isIconOnly className="rounded-full">
                    <Facebook className="w-4 h-4" />
                </Button>
                <Button isIconOnly className="rounded-full">
                    <Twitter className="w-4 h-4" />
                </Button>
                <Button isIconOnly className="rounded-full">
                    <Linkedin className="w-4 h-4" />
                </Button>
                <Button isIconOnly className="rounded-full">
                    <Youtube className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}