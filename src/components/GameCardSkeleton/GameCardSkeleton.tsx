import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

interface GameCardSkeletonStyleProps {
  style: React.CSSProperties;
}

const GameCardSkeleton = ({ style }: GameCardSkeletonStyleProps) => {
  return (
    <Card style={style}>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
