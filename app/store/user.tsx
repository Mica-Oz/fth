/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export const userStore = create((set) => ({
  user: {
    fName: "Test-1",
    lName: "Test-2",
    id: "00000",
  },
  updateUser: (inputs: any) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set((state: any) => ({
      user: {
        fName: inputs.fName,
        lName: inputs.lName,
        id: inputs.id,
      },
    })),
}));
