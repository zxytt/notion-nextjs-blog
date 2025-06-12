export default function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="font-black text-[30px] sm:text-[24px]">{title}</h1>
    </div>
  );
}
