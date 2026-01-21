const Filter = ({ filters, setFilters }) => {
  return (
    <div className="filter-box">
      <select
        value={filters.department}
        onChange={(e) =>
          setFilters({ ...filters, department: e.target.value })
        }
      >
        <option value="">All Departments</option>
        <option value="eye">Eye</option>
        <option value="brain">Brain</option>
        <option value="heart">Heart</option>
      </select>

      <input
        type="number"
        placeholder="Min Experience"
        value={filters.minExperience}
        onChange={(e) =>
          setFilters({ ...filters, minExperience: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Max Fee"
        value={filters.maxFee}
        onChange={(e) =>
          setFilters({ ...filters, maxFee: e.target.value })
        }
      />
    </div>
  );
};

export default Filter;
