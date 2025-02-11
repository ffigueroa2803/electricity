import { useEffect, useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import markerAnimate from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { setBrandSelected } from "../features/brand/brandSlice";
import { setMeasureSelected } from "../features/measure/measureSlice";
import { setAreaSelected } from "../features/area/areaSlice";
import { setProductSelected } from "../features/product/productSlice";
import { setPlaceSelected } from "../features/place/placeSlice";
import { setReasonSelected } from "../features/reason/reasonSlice";
import { setSituationSelected } from "../features/situation/situationSlice";

const MasterSelect = ({ selected, maintainer, required = true }) => {
  const dispatch = useDispatch();
  const { currentColor } = useSelector((state) => state?.theme);

  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#EDEDED",
        primary: `${currentColor}`,
      },
    };
  };

  const handleSelectChange = (e) => {
    if (maintainer == "marcas") dispatch(setBrandSelected(e?.obj || null));
    if (maintainer == "medidas") dispatch(setMeasureSelected(e?.obj || null));
    if (maintainer == "areas") dispatch(setAreaSelected(e?.obj || null));
    if (maintainer == "productos") dispatch(setProductSelected(e?.obj || null));
    if (maintainer == "lugares") dispatch(setPlaceSelected(e?.obj || null));
    if (maintainer == "situaciones")
      dispatch(setSituationSelected(e?.obj || null));
    if (maintainer == "motivos") dispatch(setReasonSelected(e?.obj || null));
  };

  const loadValue = () => {
    if (!selected) return null;
    return {
      label: selected.name,
      value: selected.id,
      obj: selected,
    };
  };

  const promiseOptions = useCallback(
    (inputValue) =>
      new Promise(async (resolve) => {
        let limit = inputValue.length == 0 ? 4 : 100;
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_API
          }/api/${maintainer}?page=1&limit=${limit}&querySearch=${inputValue}&state=true`
        );
        const result = await response.json();

        resolve(
          result?.items?.map((item) => ({
            label: `${item.name}`,
            value: item.id,
            obj: item,
          }))
        );
      }),
    []
  );

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <AsyncSelect
      id={id}
      cacheOptions
      components={markerAnimate()}
      theme={customTheme}
      isClearable
      isSearchable
      defaultOptions
      loadOptions={promiseOptions}
      onChange={(e) => handleSelectChange(e)}
      value={loadValue()}
      required={required}
    />
  ) : null;
};

export default MasterSelect;
