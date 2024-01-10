import Dropdown from '../dropdown/dropdown';
import './sortControl.scss';

const SortControl = ({ currentSelection, handleSelectChange }) => {
    const options = {
        "release_date": "Release Date",
        "title": "Title"
    };
    return (
        <div className="sort-by">
            <label htmlFor="sort-select">SORT BY</label>
            <Dropdown options={options} selectedOption={currentSelection} onChange={(e) => handleSelectChange(e.target.value)} />
        </div>
    );
}
export default SortControl;