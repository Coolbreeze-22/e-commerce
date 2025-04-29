import aboutFounder from "../assets/aboutFounder.png";
import aboutDirector from "../assets/aboutDirector.png";
import aboutDesigner from "../assets/aboutDesigner.png";

type PersonData = {
    id: string;
  name: string;
  position: Array<string>;
  title: string;
  age: number | null;
  photo: string;
  facebook: string;
  x: string;
  instagram: string;
  linkedin: string;
};
export const owners: Array<PersonData> = [
  {
    id: "1",
    name: "Tom Cruise",
    position: ["Founder", "Chairman"],
    title: "Founder and Chairman",
    age: 38,
    photo: aboutFounder,
    facebook: "",
    x: "",
    instagram: "",
    linkedin: "",
  },
  {
    id: "2",
    name: "Emma Watson",
    position: ["Founder", "Chairman"],
    title: "Founder & Chairman",
    age: 43,
    photo: aboutDirector,
    facebook: "",
    x: "",
    instagram: "",
    linkedin: "",
  },
  {
    id: "3",
    name: "Will Smith",
    position: ["Product-Designer"],
    title: "Product Designer",
    age: 45,
    photo: aboutDesigner,
    facebook: "",
    x: "",
    instagram: "",
    linkedin: "",
  },
  {
    id: "4",
    name: "Tom Cruise",
    position: ["Founder", "Chairman"],
    title: "Founder and Chairman",
    age: 38,
    photo: aboutFounder,
    facebook: "",
    x: "",
    instagram: "",
    linkedin: "",
  },
  {
    id: "5",
    name: "Emma Watson",
    position: ["Founder", "Chairman"],
    title: "Founder & Chairman",
    age: 43,
    photo: aboutDirector,
    facebook: "",
    x: "",
    instagram: "",
    linkedin: "",
  }
  
];
