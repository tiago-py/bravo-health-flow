
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickActionCardProps {
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
}

export const QuickActionCard = ({ title, description, linkTo, buttonText }: QuickActionCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-gray-600">
        {description}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to={linkTo}>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
