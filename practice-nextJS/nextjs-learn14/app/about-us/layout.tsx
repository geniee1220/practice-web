export const metadata = {
  title: 'About Us',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      Nested Layout
    </div>
  );
}
