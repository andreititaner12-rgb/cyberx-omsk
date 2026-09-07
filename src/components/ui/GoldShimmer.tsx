import React from 'react';

/**
 * Выделяет слово «ЭКСКЛЮЗИВ» золотым переливающимся градиентом,
 * оставляя остальной текст рамки без изменений.
 * Регистр и падежи учитываются (ЭКСКЛЮЗИВ / Эксклюзив / эксклюзив).
 */
export const GoldShimmer: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  // Разбиваем строку по слову «эксклюзив» в любом регистре, сохраняя разделители.
  const parts = text.split(/(эксклюзив)/gi);

  return (
    <>
      {parts.map((part, i) =>
        /^эксклюзив$/i.test(part) ? (
          <span key={i} className={`text-gold-shimmer ${className}`}>
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
};
