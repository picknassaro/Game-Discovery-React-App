{
  /* Add commentary to this file */
}

import { Badge } from "@chakra-ui/react";

interface CriticScoreProps {
  score: number;
}

const CriticScore = ({ score }: CriticScoreProps) => {
  const color = score >= 80 ? "green" : score >= 60 ? "yellow" : "red";
  return (
    <Badge
      colorScheme={color}
      fontSize="14px"
      padding="2.5px 7.5px"
      borderRadius="5px"
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
