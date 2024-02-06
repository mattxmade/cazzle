import Dialog from "@mui/material/Dialog/Dialog";

type SearchFiltersModal = {
  open: boolean;
};

const SearchFiltersModal = ({ open }: SearchFiltersModal) => {
  <Dialog open={open}></Dialog>;
};

export default SearchFiltersModal;
