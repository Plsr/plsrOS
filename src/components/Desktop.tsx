type Props = {
  children?: React.ReactNode;
};

export const Desktop = ({ children }: Props) => {
  return <div className="bg-blue-200 w-screen h-screen">{children}</div>;
};
