import AsyncSelect from 'react-select/async';
import { StylesConfig } from 'react-select';
import { useSpotifyApi } from '../hooks/useSpotifyApi';
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchOnSpotify } = useSpotifyApi();
  
  const navigate = useNavigate();


  //TODO: use useState for the options
  const loadOptions = async (inputValue: string) => {
    let newOptions = []
    if (inputValue.length >= 2) {
      newOptions = await searchOnSpotify({ query: inputValue });
    }
    return newOptions;
  };

  //https://react-select.com/home#custom-styles
  const colourStyles: StylesConfig<any> = {
    // styles for the search bar field to search
    control: (styles: any) => ({ ...styles, backgroundColor: '#333' }),
    // styles for the query text
    input: (styles: any) => ({ ...styles, color: 'white'}),
    // styles for the loading menu (without options)
    menu: (styles: any) => ({
      ...styles,
      backgroundColor: '#333',
    }),
    // styles for the dropdown options
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused ? "purple" : "#333",
    })
  };

  const handleSelect = (selectedOption: any) => {
    const type = selectedOption.type;
    const itemId = selectedOption.id;

    navigate(`/${type}/${itemId}`)
  }

  
  return (
    <div>
      <h2>SearchBar</h2>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={(selectedOption) => handleSelect(selectedOption)}
        getOptionLabel={(option) => option.name}
        styles={colourStyles}
      />
    </div>
  );
};

export default SearchBar;