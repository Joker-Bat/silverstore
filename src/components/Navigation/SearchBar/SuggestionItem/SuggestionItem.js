import React from "react";

/* 
  Main Component
*/

const SuggestionItem = ({
  name,
  slug,
  style,
  clicked,
  hover,
  cursorId,
  closeBackdrop,
}) => {
  const clickHandler = () => {
    closeBackdrop();
    clicked();
  };

  return (
    <div
      className={style.join(" ")}
      data-id={slug}
      onClick={clickHandler}
      onMouseOver={() => hover(cursorId)}
    >
      {name}
    </div>
  );
};

export default SuggestionItem;
