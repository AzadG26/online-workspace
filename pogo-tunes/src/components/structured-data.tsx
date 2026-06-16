type Schema = Record<string, unknown>

export function StructuredData({ schema }: { schema: Schema | Schema[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
      }}
    />
  )
}
