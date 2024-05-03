import { useContext } from "react";
import { CurrentFormCommentContext } from "../context/ShowFormContext";

export const useCurrentFormComment = () => useContext(CurrentFormCommentContext);
