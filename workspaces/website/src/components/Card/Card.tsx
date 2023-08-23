import { Box, BoxProps, Flex, ChakraProps } from "@chakra-ui/react";
import { CardGradientBorder } from "@ui/Card/components/CardGradientBorder";
import { ReactNode } from "react";
import {
  LargeCardLayout,
  LargeCardImgLayout,
  LargeCardBodyLayout,
  LargeCardHorizontalBodyLayout,
  LargeCardHorizontalLayout,
  IconLinkCardLayout,
  IconLinkCardBodyLayout,
  IconLinkCardLinkLayout,
  GridCardLayout,
  GridCardImgLayout,
  GridCardBodyLayout,
  AssetCardLayout,
  AssetCardTitleLayout,
  AssetCardHorizontalLayout,
  AssetCardImgLayout,
  AssetCardImgHorizontalLayout,
  AssetCardBodyLayout
} from "./CardStyles";
import { Heading } from "@ui/Typography/Heading";
import { CustomLink } from "@ui/Link";

type BodyProps = {
  variant?: "grid" | "asset" | "large" | "iconLink";
  children: ReactNode;
  height?: string;
  orientation?: string;
  sx?: ChakraProps['sx']
};

type TitleProps = {
  variant?: "grid" | "asset" | "large" | "iconLink";
  children: ReactNode;
};

type LinkProps = {
  variant?: "grid" | "asset" | "large" | "iconLink";
  children: ReactNode;
  href: string;
};

type ImgProps = {
  variant?: "grid" | "asset" | "large" | "iconLink";
  src: string;
  orientation?: string;
}

type Props = {
  variant?: "grid" | "asset" | "large" | "iconLink";
  orientation?: "horizontal" | "vertical";
} & BoxProps;

const bodyStyles = {
  display: "flex",
  minWidth: "164px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  flex: "1 0 0"
}

const linkStyles = {
  display: "flex",
}

const imgStyles = {
  display: "flex",
}

const titleStyles = {
  display: "flex",
}

export const CardBody = ({ variant, height, orientation, children, sx }: BodyProps) => {
  const styles = {
    ...variant === "large" ? (orientation === "horizontal" ? LargeCardHorizontalBodyLayout : LargeCardBodyLayout) : "iconLink" ? IconLinkCardBodyLayout : variant === "grid" ? GridCardBodyLayout : variant === "asset" ? AssetCardBodyLayout : bodyStyles,
    ...height && { height: height }
  }
  return (
    <Flex sx={{ ...styles, ...sx }}>
      {children}
    </Flex>
  );
};

export const CardLink = ({ variant, href, children }: LinkProps) => {
  let styles = {
    ...(variant === "iconLink" || variant === "grid") ? IconLinkCardLinkLayout : linkStyles
  }
  return (
    <CustomLink size="md" href={href} sx={styles}>
      {children}
    </CustomLink>
  );
};

export const CardImg = ({ variant, orientation, src }: ImgProps) => {
  const styles = {
    ...variant === "large" ? LargeCardImgLayout : variant === "grid" ? GridCardImgLayout : variant === "asset" ? (orientation === "horizontal" ? AssetCardImgHorizontalLayout : AssetCardImgLayout) : imgStyles
  }
  return (
    <img style={styles} src={src} alt=""/>
  );
};

export const CardTitle = ({ variant, children }: TitleProps) => {
  let styles = {
    ...(variant === "grid" || variant === "asset") ? AssetCardTitleLayout : titleStyles
  }
  return (
    <Heading sx={styles} variant={variant === "large" ? "h2" : "h3"} color="btn-primary-bg">
      {children}
    </Heading>
  );
};

export const Card = (props: Props) => {
  const { variant, orientation = "vertical", sx, ...rest } = props;
  const bgColor = variant === "asset" ? "white" : "#FBFBFB"
  let styles = {
    borderRadius: "16px",
  }
  switch(variant) {
    case 'grid':
      styles = {
        ...styles,
        ...GridCardLayout
      }
      break;
    case 'asset':
      styles = {
        ...styles,
        ...orientation === "horizontal" ? AssetCardHorizontalLayout : AssetCardLayout
      }
      break;
    case 'large':
      styles = {
        ...styles,
        ...orientation === "horizontal" ? LargeCardHorizontalLayout : LargeCardLayout
      }
      break;
    case 'iconLink':
      styles = {
        ...styles,
        ...IconLinkCardLayout
      }
      break;
    default:
      break;
  }
  if (variant === "large") {
    console.log('styles ', styles)
  }
  return (
    <CardGradientBorder bg={bgColor} padding="0" borderRadius="16px">
      <Box
        sx={{...styles, ...sx}} {...rest}
      />
    </CardGradientBorder>
  )
};
