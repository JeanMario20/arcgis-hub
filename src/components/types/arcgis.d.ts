declare global {
    namespace JSX{
        interface IntrinsicElements {
        "arcgis-map": React.DetailedHTMLProps<
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
            HTMLAnchorElement>;
        }
}
}
export {}; // Para evitar conflictos con módulos