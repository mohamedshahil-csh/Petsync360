import React from 'react';
import { Clock, Edit2, Eye, Trash, Repeat, Plus, X, CheckCircle, PowerOff, XCircle, PawPrint } from 'lucide-react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

const createIcon =
  (Component: React.FC<React.SVGProps<SVGSVGElement>>) =>
  ({ size = 20, ...rest }: IconProps) =>
    <Component width={size} height={size} {...rest} />;

export const IconEdit = createIcon(Edit2);
export const IconEye = createIcon(Eye);
export const IconTrash = createIcon(Trash);
export const IconClock = createIcon(Clock);
export const IconRefund = createIcon(Repeat);
export const IconPlus =createIcon(Plus)
export const IconCancel = createIcon(X);
export const IconActivate = createIcon(CheckCircle); // or Power
export const IconDeactivate = createIcon(PowerOff);  // or XCircle
export const IconReject = createIcon(XCircle); 
export const IconPaw=createIcon(PawPrint)