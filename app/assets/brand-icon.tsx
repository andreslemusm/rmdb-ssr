type BrandIconProps = {
  className?: string;
};

export const BrandIcon = ({
  className,
}: BrandIconProps): React.ReactElement => (
  <svg
    width={128}
    height={128}
    viewBox="0 0 128 128"
    fill="currentColor"
    className={className}
  >
    <rect x="15" y="15" width="85" height="20" />
    <rect
      x="15"
      y="113"
      width="60"
      height="20"
      transform="rotate(-90 15 113)"
    />
    <rect
      x="66"
      y="113"
      width="60"
      height="20"
      transform="rotate(-90 66 113)"
    />
    <rect x="83" y="93" width="30" height="20" />
  </svg>
);
