import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TiWatch } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { PiHeadphonesThin } from "react-icons/pi";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { GiGymBag } from "react-icons/gi";
import { GiMedicines } from "react-icons/gi";import { IoManOutline } from "react-icons/io5";
import { IoWomanOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";

export const getIcon = (category: string) => {

    if (/phone|mobile/i.test(category)) {
        return IoIosPhonePortrait;
      } else if (/computer|laptop|desktop/i.test(category)) {
        return HiOutlineDesktopComputer;
      } else if (/watch/i.test(category)) {
        return TiWatch;
      } else if (/camera/i.test(category)) {
        return FiCamera;
      } else if (/headphone/i.test(category)) {
        return PiHeadphonesThin;
      } else if (/gaming/i.test(category)) {
        return MdOutlineVideogameAsset;
      } else if (/bag/i.test(category)) {
        return GiGymBag;
      } else if (/medicine|drug|pain/i.test(category)) {
        return GiMedicines;
      } else if (/men/i.test(category)) {
        return IoManOutline;
      } else if (/women/i.test(category)) {
        return IoWomanOutline;
      } else {
        return BsCart3;
      }

  };
  
  