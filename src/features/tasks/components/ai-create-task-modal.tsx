"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { AiCreateTaskFormWrapper } from "./ai-create-task-form-wrapper";

import { useAiCreateTaskModal } from "../hooks/use-ai-create-task-modal";

export const AiCreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useAiCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AiCreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
