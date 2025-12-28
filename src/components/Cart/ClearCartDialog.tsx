import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import React from "react";

interface ClearCartDialogProps {
    isConfirmOpen: boolean;
    setIsConfirmOpen: (open: boolean) => void;
    removeCart: (key: boolean) => void;
    isRemovingCart: boolean;
}

export default function ClearCartDialog({
    isConfirmOpen,
    setIsConfirmOpen,
    removeCart,
    isRemovingCart,
}: ClearCartDialogProps) {
    return (
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full h-16 rounded-4xl cursor-pointer border-2 border-dashed border-muted text-muted-foreground hover:text-destructive hover:bg-destructive/5 hover:border-destructive/30 font-black uppercase tracking-[0.2em] text-xs transition-all group"
                >
                    <Trash2Icon className="mr-2 size-4 group-hover:shake" />
                    Flush Entire Cart
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] rounded-4xl p-8 border-none shadow-2xl">
                <DialogHeader className="space-y-4">
                    <div className="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-2">
                        <AlertTriangleIcon className="size-8" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight text-center">
                        Clear Entire Cart?
                    </DialogTitle>
                    <DialogDescription className="text-center font-medium text-muted-foreground leading-relaxed">
                        This action will remove all items from your current session manifest.
                        This cannot be undone. Are you sure you want to proceed?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2 gap-4 mt-6">
                    <Button
                        variant="ghost"
                        onClick={() => setIsConfirmOpen(false)}
                        className="rounded-xl h-12 font-black text-[10px] uppercase tracking-widest hover:bg-muted cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => removeCart(true)}
                        disabled={isRemovingCart}
                        className="rounded-xl h-12 font-black text-[10px] uppercase tracking-widest bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 cursor-pointer"
                    >
                        {isRemovingCart ? <Spinner /> : "Confirm Clear"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
