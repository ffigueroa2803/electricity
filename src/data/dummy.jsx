import { AiOutlineDashboard } from "react-icons/ai";
import { BsCurrencyDollar, BsFilePerson, BsShield } from "react-icons/bs";
import { TfiRuler } from "react-icons/tfi";
import { HiOutlineUsers } from "react-icons/hi";
import { BiWorld, BiSpreadsheet, BiBadgeCheck } from "react-icons/bi";
import { RiProductHuntLine, RiStackLine } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { FiCreditCard } from "react-icons/fi";

import avatar5 from "../assets/avatar5.png";

export const links = [
  {
    title: "Tablero",
    links: [
      {
        route: "dashboard",
        name: "Tablero",
        icon: <AiOutlineDashboard />,
      },
    ],
  },
  {
    title: "Mantenimentos",
    links: [
      {
        route: "measures",
        name: "medidas",
        icon: <TfiRuler />,
      },
      {
        route: "brands",
        name: "marcas",
        icon: <BiBadgeCheck />,
      },
      {
        route: "users",
        name: "usuarios",
        icon: <HiOutlineUsers />,
      },
      {
        route: "areas",
        name: "areas",
        icon: <BiSpreadsheet />,
      },
      {
        route: "places",
        name: "lugares",
        icon: <BiWorld />,
      },
      {
        route: "products",
        name: "productos",
        icon: <RiProductHuntLine />,
      },
      {
        route: "nota-pedido",
        name: "nota pedido",
        icon: <RiStackLine />,
      },
    ],
  },
];

export const chatData = [
  {
    image: avatar5,
    message: "¡Román se unió al equipo!",
    desc: "Felicitarlo",
    time: "9:08 AM",
  },
];

export const userProfileData = [
  {
    icon: <BsFilePerson />,
    title: "Mi perfil",
    desc: "Configuraciones de la cuenta",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    route: "profile",
  },
  {
    icon: <BsShield />,
    title: "Mi bandeja de entrada",
    desc: "Mensajes & Correos electrónicos",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "Mis tareas",
    desc: "Tareas pendientes y diarias",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];

export const themeColors = [
  {
    name: "tema-azul",
    color: "#1A97F5",
  },
  {
    name: "tema-verde",
    color: "#03C9D7",
  },
  {
    name: "tema-morado",
    color: "#7352FF",
  },
  {
    name: "tema-rojo",
    color: "#FF5C8E",
  },
  {
    name: "tema-indigo",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "tema-naranja",
  },
];

export const situation = [
  { value: "nuevo", label: "Nuevo", name: "situacion" },
  { value: "segundo", label: "Segundo uso", name: "situacion" },
  { value: "recuperado", label: "Recuperado", name: "situacion" },
];

export const typeDocument = [
  { value: "ENTRY", label: "Entrada", name: "typeDocument" },
  { value: "EXIT", label: "Salida", name: "typeDocument" },
];

export const motivo = [
  { value: "compra", label: "Compra", name: "motivo" },
  { value: "devolucion", label: "Devolución", name: "motivo" },
  { value: "sobrante", label: "Sobrante", name: "motivo" },
  { value: "desmontaje", label: "Desmontaje", name: "motivo" },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];

export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: "x",
    yName: "y",
    name: "Germany",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[1],
    xName: "x",
    yName: "y",
    name: "England",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[2],
    xName: "x",
    yName: "y",
    name: "India",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];

export const LinePrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis = {
  labelFormat: "{value}%",
  rangePadding: "None",
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const recentTransactions = [
  {
    icon: <BsCurrencyDollar />,
    amount: "+$350",
    title: "Transferencia de PayPal",
    desc: "Dinero agredado",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "green-600",
  },
  {
    icon: <BsShield />,
    amount: "-$560",
    desc: "Pago de la factura",
    title: "Billetera",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
  {
    icon: <FiCreditCard />,
    amount: "+$350",
    title: "Tarjeta de crédito",
    desc: "Dinero invertido",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",

    pcColor: "green-600",
  },
  {
    icon: <TiTick />,
    amount: "+$350",
    title: "Transferencia bancaria",
    desc: "Dinero agredado",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",
    pcColor: "green-600",
  },
  {
    icon: <BsCurrencyDollar />,
    amount: "-$50",
    percentage: "+38%",
    title: "Reembolso",
    desc: "Pago enviado",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
];

export const LoadingCircle = () => {
  return (
    <svg
      className="h-5 m-auto text-rose-600 animate-spin"
      style={{
        position: "absolute",
        top: "5%",
        right: "10%",
      }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const LoadingCard = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
      {[1, 2, 3, 4].map((index) => (
        <div
          className="relative shadow-xl px-3 pt-3 overflow-hidden rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer transition bg-[#fff] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-black/20 before:animate-[shimmer_1.3s_infinite] animate-pulse"
          key={index}
        >
          <div
            className="mb-3 rounded-lg rounded-br-[90px] rounded-tl-[90px] mx-auto
      min-w-[240px] max-w-[240px] min-h-[240px] max-h-[240px] object-cover bg-gray-50"
          ></div>
          <div className="mb-2 flex text-sm justify-around px-0 align-center">
            {["", ""]
              .map((shoeF, index) => {
                const IndexStyle =
                  index === 0 ? "bg-yellow-100" : "bg-rose-100";
                return (
                  <span
                    className={`capitalize ${IndexStyle} rounded-lg text-white px-0 py-[0.7rem] tracking-[.04em] w-[95px] h-[20px]`}
                    key={index}
                  >
                    {shoeF}
                  </span>
                );
              })
              .splice(0, 2)}
          </div>
          <div className="flex justify-between mb-2 bg-gray-50 animate-pulse px-6 py-[1.2rem] rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export const LoadingSinglePage = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center text-center md:min-h-[640px] md:flex-row mx-4">
      <div className="basis-1/3 flex-1 relative shadow-xl mt-3 overflow-hidden rounded-lg  w-full mx-auto cursor-pointer transition bg-[#fff] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-black/20 before:animate-[shimmer_2s_infinite]">
        <div className="m-auto rounded-lg w-full min-h-[90vh] object-cover bg-white"></div>
      </div>
    </div>
  );
};
