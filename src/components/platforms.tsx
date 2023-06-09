import Platform from "~/components/platform";
import usePlatforms from "~/hooks/usePlatforms";
import { platforms } from "~/utils/platform";

const Platforms = () => {
  const { data, status } = usePlatforms();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-left font-medium text-black/80">
      Connected platforms
      <div className="mt-2 flex items-center justify-evenly gap-2 font-normal">
        {platforms.map((platform) => {
          const account = data?.find((a) => a.provider === platform);
          return (
            <Platform
              key={platform}
              provider={platform}
              connected={!!account}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Platforms;
