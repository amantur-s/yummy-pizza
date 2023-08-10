import React from "react"
import { DebounceInput } from "react-debounce-input"
import { useDispatch, useSelector } from "react-redux"
import clearIcon from "../../assets/icons/clear-icon.svg"
import { selectFilter, setSearch } from "../../store/slices/filterSlice"
import styles from "./Search.module.scss"

const Search: React.FC = () => {
  const { searchValue } = useSelector(selectFilter)
  const dispatch = useDispatch()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const clearFocus = () => {
    dispatch(setSearch(""))
    inputRef.current?.focus()
  }

  const inputHandler = (event: any) => {
    dispatch(setSearch(event.target.value))
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
