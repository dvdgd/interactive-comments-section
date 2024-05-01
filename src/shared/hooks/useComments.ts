import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";

export const useComments = () => useContext(CommentsContext);
