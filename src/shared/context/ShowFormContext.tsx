import { createContext, useState } from "react";

interface ShowFormContextType {
  currentComment: { commentId?: string } | null;
  openForm: ({ commentId }: { commentId: string }) => void;
  closeForm: () => void;
}
export const ShowFormContext = createContext({} as ShowFormContextType);

export function ShowFormProvider({ children }: { children: React.ReactNode }) {
  const [currentComment, setCurrentComment] =
    useState<ShowFormContextType['currentComment']>(null);

  const openForm: ShowFormContextType['openForm'] = ({
    commentId
  }) => {
    setCurrentComment({ commentId });
  }

  const closeForm = () => {
    setCurrentComment(null);
  }

  return (
    <ShowFormContext.Provider value={{
      currentComment,
      openForm,
      closeForm,
    }}>
      {children}
    </ShowFormContext.Provider>
  );
}

