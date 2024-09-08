import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export let activeButtonRef;

const InPageNavigation = ({
  headings,
  hiddens,
  children,
  defaultActive = 0,
}) => {
  const [width, setWidth] = useState(0);
  const [eventAdded, setEventAdded] = useState(false);
  const borderRef = useRef();
  activeButtonRef = useRef();
  const [active, setActive] = useState(defaultActive || 0);
  const handleChangeHeading = (btn, index) => {
    // get width of the button
    const width = btn.offsetWidth;

    // get left position of the button
    const left = btn.offsetLeft;

    // get border
    borderRef.current.style.width = width + "px";
    borderRef.current.style.left = left + "px";

    setActive(index);
  };

  useEffect(() => {
    console.log("active", active, "width", width);
    handleChangeHeading(activeButtonRef.current, width >= 768 ? 0 : active);
  }, [width]);

  useEffect(() => {
    if (eventAdded) return;

    console.log("event added");

    window.addEventListener("resize", () => {
      console.log("resize" + window.innerWidth);
      setWidth(window.innerWidth);
    });

    setEventAdded(true);
  }, []);

  // TODO: check if screen is back resized to large (border was active on mobile)

  return (
    <>
      <nav className="relative flex items-center">
        {headings.map((heading, i) => {
          return (
            <button
              key={i}
              ref={active === i ? activeButtonRef : null}
              onClick={(e) => handleChangeHeading(e.target, i)}
              className={clsx({
                "p-4 bx-5 capitalize": true,
                "text-black": active === i,
                "text-dark-grey": active !== i,
                "md:hidden": hiddens.includes(heading),
              })}
            >
              {heading}
            </button>
          );
        })}

        <hr
          ref={borderRef}
          className="border border-b border-black absolute bottom-0"
        />
      </nav>

      <div className="content-wrapper py-6">
        {Array.isArray(children) ? children[active] : children}
      </div>
    </>
  );
};

export default InPageNavigation;
