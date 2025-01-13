import React from "react";
import { Button, TextField, InputAdornment, Autocomplete } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchAndSort = ({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  existingUsers,
  handleClearSearch,
}) => {
  return (
    <div>
      <div className="flex flex-col justify-evenly sm:flex-row ">
        <Button
          variant="outlined"
          color={sortOption === "likes" ? "secondary" : "default"}
          onClick={() => setSortOption("likes")}
          // style={{ marginRight: "10px" }}
        sx={{ marginBlock:"3px"}}

        >
          Sort by Likes
        </Button>
        <Button
          variant="outlined"
          color={sortOption === "comments" ? "secondary" : "default"}
          onClick={() => setSortOption("comments")}
        sx={{ marginBlock:"3px"}}
        >
          Sort by Comments
        </Button>
        <Button
          variant="outlined"
          color={sortOption === "recent" ? "secondary" : "default"}
          onClick={() => setSortOption("recent")}
        sx={{ marginBlock:"3px"}}

        >
          Recent
        </Button>
      </div>
      {/* Search with Autocomplete */}
      <Autocomplete
        freeSolo
        options={existingUsers.map((user) => user.userName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Posts"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "20px" }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Clear button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearSearch}
        style={{ marginTop: "10px", marginBottom: "20px" }}
      >
        Clear Search
      </Button>
    </div>
  );
};

export default SearchAndSort;
