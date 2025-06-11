import Badge from "../ui/badge";
import Card from "../card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Blog as BlogType } from "@/types";
import Link from "next/link";
// @ts-ignore
import dateformat from "dateformat";

export default function Blog(props: BlogType) {
    return (
      <Card>
        <div className="flex md:flex-col rounded-xl overflow:hidden border">
          <Link className="flex-none" href={`/${props.lang}/blogs/${props.slug}`}>
            <Image
              src={props.image!}
              alt="blog"
              width={350}
              height={209}
              className="rounded-l-xl md:rounded-t-xl max-h-[209px] md:w-full"
              placeholder="blur"
              blurDataURL="/blur-placeholder.png"
            />
          </Link>
          <div className="flex flex-col justify-between gap-4 grow py-4 px-6 md:px-2">
            <Link
              href={`/${props.lang}/blogs/${props.slug}`}
              className="hover:underline"
            >
              <h3 className="text-[20px] font-extrabold leading-tight sm:text-lg sm:font-bold truncate">
                {props.title}
              </h3>
            </Link>
            <div className="flex gap-2 flex-wrap">
              {props?.categories?.map((category: string) => (
                // <Link
                // href={`/${props.lang}/blogs?page=1&category=${category}`}
                // key={category}
                // >
                  <Badge key={category} className="bg-red-100 text-red-500">
                  {category}
                  </Badge>
                // </Link>
              ))}
            </div>
            <p className="font-medium text-slate-600">{props.description}</p>
            <div className="flex justify-between">
              <div>
                <span className="mr-2 text-xs text-slate-600">
                  {dateformat(props.date, 'ddS mmmm, yyyy')}
                </span>
                <Badge className="bg-blue-100 text-blue-600">
                  {props.readTime} {props.page.blogs.minRead}
                </Badge>
              </div>
              <Link
                href={`/${props.lang}/blogs/${props.slug}`}
                className="flex items-center gap-1 text-xs font-bold leading-tight text-blue-500 hover:underline"
              >
                {props.page.blogs.readMore}
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  };