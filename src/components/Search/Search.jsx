import React from "react"
import { DebounceInput } from "react-debounce-input"
import { useDispatch, useSelector } from "react-redux"
import clearIcon from "../../assets/icons/clear-icon.svg"
import { setSearch } from "../../store/slices/filterSlice"
import styles from "./Search.module.scss"

function Search() {
  const { searchValue } = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const inputRef = React.useRef()

  const clearFocus = () => {
    dispatch(setSearch(""))
    inputRef.current.focus()
  }

  const inputHandler = e => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div className={styles.container}>
      <DebounceInput
        inputRef={inputRef}
        className={styles.search}
        placeholder="Поиск пиццы..."
        onChange={inputHandler}
        value={searchValue}
        debounceTimeout={800}
      />
      {searchValue && (
        <img
          className={styles.clear}
          onClick={clearFocus}
          src={clearIcon}
          alt=""
        />
      )}
    </div>
  )
}

export default Search
