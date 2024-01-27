import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton />
      <Flex my="2" className="space-x-3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
