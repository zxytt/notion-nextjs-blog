import Card from '@/components/card';
import Badge from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project as ProjectType } from '@/types';
// @ts-ignore
import Chip from '@/components/chip';

export default function Project (props: ProjectType) {
  return (
    <Card>
      <div className="flex md:flex-col rounded-xl overflow:hidden border">
        <Link className="flex-none" href={`/${props.lang}/projects/${props.slug}`}>
          <div className="bg-image relative overflow-hidden h-[209px] rounded-l-xl md:rounded-none md:rounded-t-xl">
            <Image
              src={props.image!}
              alt="blog"
              width={350}
              height={209}
              className="object-cover md:w-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
              placeholder="blur"
              blurDataURL="/blur-placeholder.png"
              quality={60}
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
            <div className="absolute inset-0 bg-primary/0  transition-all duration-300" />
          </div>
        </Link>
        <div className="flex flex-col justify-between gap-2 grow py-2 px-6 md:px-2">
          <div className="flex justify-between">
            <Chip color="blue">{props.year}</Chip>
            <Chip color="green">
              {props.isCompleted ? `Completed` : `In progress`}
            </Chip>
          </div>
          <div className="flex flex-col justify-between gap-4 grow">
            <Link
              className="hover:underline"
              href={`/${props.lang}/projects/${props.slug}`}
            >
              <h3 className="text-[20px] font-extrabold leading-tight sm:text-lg sm:font-bold truncate">
                {props.name}
              </h3>
            </Link>
          </div>
          <p className="text-base leading-tight font-medium text-slate-600 w-full line-clamp-2">{props.description}</p>        
          <div className="flex gap-2 flex-wrap w-full">
            {props.stack.map((item) => (
              <Badge key={item} className="bg-blue-100 text-blue-600">
                {item}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-end flex-grow">
            <Link
              href={`/${props.lang}/projects/${props.slug}`}
              className="flex gap-1 items-center text-sm font-medium text-blue-500 hover:underline"
            >
              See details
              <ArrowRight size={15} />
            </Link>
            <div className="flex gap-4">
              <Link
                href={props.previewLink!}
                className="text-sm font-medium text-blue-500 hover:underline"
                target="_blank"
              >
                Preview
              </Link>
              <Link
                href={props.githubLink!}
                className="text-sm font-medium text-blue-500 hover:underline"
                target="_blank"
              >
                Github
              </Link>
            </div>
          </div>   
        </div>
      </div>
    </Card>
  );
};