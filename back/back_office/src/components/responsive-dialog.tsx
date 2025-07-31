import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@components/ui/dialog.tsx";
import type {Dispatch, SetStateAction} from "react";

export default function ResponsiveDialog({children, open, onOpenChange, title, description}: {
    children: React.ReactNode,
    open: boolean,
    onOpenChange: Dispatch<SetStateAction<boolean>>,
    title: string,
    description: string,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}