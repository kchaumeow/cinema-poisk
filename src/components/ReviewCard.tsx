import { colors, Review } from "../types";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card
      borderColor={colors.get(review.type) + ".300"}
      borderWidth={1}
      bg="#141414"
      w={{ xs: "200px", sm: "300px", md: "400px", lg: "600px" }}
    >
      <CardHeader display="flex" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color="white">
          {review.author}
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="white">
          {new Date(review.updatedAt).toLocaleString("ru", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            year: "2-digit",
          })}
        </Text>
      </CardHeader>
      <CardBody>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={colors.get(review.type) + ".300"}
        >
          {review.title}
        </Text>
        <Text fontSize="lg" color="white">
          {review.review}
        </Text>
      </CardBody>
    </Card>
  );
}
