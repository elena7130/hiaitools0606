import Link from 'next/link';

// 定义符号列表
const symbols = ['💼', '💻', '🏥', '📚', '🎨', '🏡', '🤑', '🤖', '🧙‍♂️', '💖', '⭐', '🍄', '👸', '💎'];

function getSymbolForTag(name: any) {
  // 基于标签名计算哈希值并选择符号
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + hash * 31; // 乘以31是为了代替位运算
  }
  const index = Math.abs(hash) % symbols.length;
  return symbols[index];
}

export function TagItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='text-l flex h-[38px] items-center justify-center gap-[2px] whitespace-nowrap rounded-full bg-[#dddee0] px-3'>
      {children}
    </div>
  );
}

export function TagLink({ name, href }: { name: string; href: string }) {
  const symbol = getSymbolForTag(name);
  const nameWithSymbol = `${symbol} ${name}`;
  return (
    <Link href={href} title={nameWithSymbol}>
      <TagItem>{nameWithSymbol}</TagItem>
    </Link>
  );
}

export function TagList({ data }: { data: { name: string; href: string; id: string }[] }) {
  return (
    <ul className='no-scrollbar flex max-w-full flex-1 flex-wrap items-center gap-3 overflow-hidden'>
      {data.map((item) => (
        <li key={item.id}>
          <TagLink name={item.name} href={item.href} />
        </li>
      ))}
    </ul>
  );
}
