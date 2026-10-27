import NextImage, { type ImageProps } from "next/image";
import { withBasePath } from "@/lib/paths";

// Public images need the deployment prefix; static imports keep their own URL.
export default function Image({ src, ...props }: ImageProps) {
  return (
    <NextImage
      {...props}
      src={typeof src === "string" ? withBasePath(src) : src}
    />
  );
}
