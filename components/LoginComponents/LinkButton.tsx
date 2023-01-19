import { ThemeProvider } from '@mui/material';
import Link from 'next/link';
import theme from '../../styles/theme/Theme';

export const LinkButton = ({ text, link }: { text: any; link: any }) => {
  return (
    <Link href={link} passHref>
      <a style={{ textDecoration: 'underline' }}>{text}</a>
    </Link>
  );
};

export default LinkButton;
