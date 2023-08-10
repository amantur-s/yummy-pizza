import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={470}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="337" y="31" rx="3" ry="3" width="88" height="6" />
      <circle cx="123" cy="131" r="123" />
      <rect x="1" y="318" rx="10" ry="10" width="260" height="70" />
      <rect x="2" y="415" rx="6" ry="6" width="90" height="25" />
      <rect x="146" y="406" rx="6" ry="6" width="110" height="42" />
      <rect x="13" y="274" rx="11" ry="11" width="230" height="17" />
    </ContentLoader>
  )
}

export default Skeleton
