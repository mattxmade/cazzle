import "server-only";

import deleteAccount from "@/server/user/deleteAccount";
import DeleteAccountStatus from "./DeleteAccountStatus";

const DeleteAccountForm = () => {
  return (
    <form action={deleteAccount}>
      <DeleteAccountStatus />
    </form>
  );
};

export default DeleteAccountForm;
