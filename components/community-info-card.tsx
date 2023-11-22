interface CommunityInfoCardProps {
  data: {
    title: string;
    description: string;
  };
}

export function CommunityInfoCard({ data }: CommunityInfoCardProps) {
  return (
    <div className="hover:cursor-pointer block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div
        className="relative overflow-hidden bg-no-repeat bg-gradient-to-l hover:bg-gradient-to-r"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {data.title}
        </h5>
        <p className="mb-4 text-base text-neutral-500 dark:text-neutral-200">
          {data.description}
        </p>
      </div>
    </div>
  );
}
