import { PawPrint, User, ShoppingCart, Stethoscope } from "lucide-react";

export const statCards= (data: any) => [
    { title: "Total Pet Owners", value: data?.patients, icon: <PawPrint size={24} />, gradient: "from-teal-400 to-teal-600" },
    { title: "Total Vets", value: data?.providers, icon: <User size={24} />, gradient: "from-blue-400 to-blue-600" },
    { title: "Total Vendors", value: data?.serviceProviders, icon: <ShoppingCart size={24} />, gradient: "from-purple-400 to-purple-600" },
    { title: "Total Veterinarians", value: data?.providers, icon: <Stethoscope size={24} />, gradient: "from-orange-400 to-orange-600" },
    { title: "Deliveries in Progress", value: data?.deliveries, icon: <ShoppingCart size={24} />, gradient: "from-green-400 to-green-600" },
];