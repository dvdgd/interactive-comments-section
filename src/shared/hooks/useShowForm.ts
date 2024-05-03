import { useContext } from "react";
import { ShowFormContext } from "../context/ShowFormContext";

export const useShowForm = () => useContext(ShowFormContext);
