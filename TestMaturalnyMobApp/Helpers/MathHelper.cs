using System.Text.RegularExpressions;

namespace TestMaturalnyMobApp.Helpers;

public static class MathHelper
{
    private static readonly string[] MathPatterns = new[]
    {
        // LaTeX маркеры
        "\\", "^", "_", "{", "}", "`",
        
        // Тригонометрические функции
        "sin", "cos", "tan", "cot", "sec", "csc",
        "sinh", "cosh", "tanh", "coth",
        "arcsin", "arccos", "arctan", "arccot",
        "arcsec", "arccsc",
        
        // Логарифмы
        "log", "ln", "lg",
        
        // Корни и дроби
        "sqrt", "root", "frac", "dfrac", "tfrac",
        
        // Интегралы и суммы
        "int", "iint", "iiint", "oint",
        "sum", "prod", "coprod",
        
        // Пределы
        "lim", "max", "min", "sup", "inf",
        "det", "deg", "arg",
        
        // Греческие буквы
        "alpha", "beta", "gamma", "delta", "epsilon",
        "zeta", "eta", "theta", "iota", "kappa",
        "lambda", "mu", "nu", "xi", "pi",
        "rho", "sigma", "tau", "upsilon",
        "phi", "chi", "psi", "omega",
        
        // Специальные символы
        "infty", "partial", "nabla", "forall",
        "exists", "in", "notin", "subset", "supset",
        "cup", "cap", "emptyset",
        
        // Скобки
        "left", "right",
        
        // Операторы
        "times", "cdot", "pm", "mp", "div",
        "circ", "bullet", "star",
        "geq", "leq", "neq", "approx", "equiv",
        "to", "rightarrow", "leftarrow", "mapsto",
        
        // Производные
        "frac{d", "dy/dx", "df/dx",
        
        // Комбинаторика
        "binom", "choose", "perm", "comb",
        "C_", "P_", "A_", "n!", "!n",
        "_n", "^n",
        
        // Интегралы
        "int_", "int_{", "oint_",
    };

    private static readonly char[] MathSymbols = new char[]
    {
        '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹',
        '±', '∓', '×', '÷', '⋅', '∗', '∘',
        '√', '∛', '∜',
        '∞', '∫', '∬', '∭', '∮', '∯',
        '∑', '∏', '∐',
        '∂', '∇',
        '∀', '∃', '∄',
        '∈', '∉', '∋', '∌',
        '⊂', '⊃', '⊄', '⊅', '⊆', '⊇', '⊈', '⊉',
        '∪', '∩', '∅',
        '≈', '≠', '≡', '≤', '≥', '≪', '≫',
        '→', '←', '↔', '↦', '⇒', '⇐', '⇔',
        'π', 'τ', 'φ', 'ψ', 'ω', 'α', 'β', 'γ',
        'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ',
        'μ', 'ν', 'ξ', 'ο', 'ρ', 'σ', 'ς', 'χ',
    };

    private static readonly Regex MathExpressionRegex = new(
        @"\([^)]*\)|" +
        @"[a-zA-Z][²³⁴⁵⁶⁷⁸⁹]|" +
        @"\d+/\d+|" +
        @"[a-zA-Z]\s*[+\-*/=]\s*[a-zA-Z0-9]",
        RegexOptions.Compiled
    );

    public static bool IsMathExpression(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return false;

        //// LaTeX маркеры
        //if (text.Contains('`') || text.Contains("\\"))
        //    return true;

        // Формулы должны быть заключены в обратные кавычки
        if (!(text.StartsWith("`") && text.EndsWith("`")))
            return false;

        // Убираем кавычки для дальнейшей проверки
        var inner = text.Trim('`');

        // Математические функции
        foreach (var pattern in MathPatterns)
        {
            if (text.Contains(pattern))
                return true;
        }

        // Regex выражения
        if (MathExpressionRegex.IsMatch(text))
            return true;

        // Знак равенства
        if (text.Contains('=') && text.Length > 3)
        {
            var parts = text.Split('=');
            if (parts.Length == 2 &&
                !string.IsNullOrWhiteSpace(parts[0]) &&
                !string.IsNullOrWhiteSpace(parts[1]))
            {
                if (HasMathContent(parts[0]) || HasMathContent(parts[1]))
                    return true;
            }
        }

        // Unicode символы
        foreach (char c in text)
        {
            if (Array.Exists(MathSymbols, symbol => symbol == c))
                return true;
        }

        return false;
    }

    private static bool HasMathContent(string text)
    {
        return Regex.IsMatch(text, @"[a-zA-Z0-9\(\)\[\]\{\}]") ||
               text.Any(c => "+-*/^".Contains(c));
    }

    public static string CleanLatex(string text)
    {
        if (string.IsNullOrEmpty(text))
            return text;

        var result = text.Trim('`');

        var replacements = new Dictionary<string, string>
        {
            { "\\log", "log" },
            { "\\ln", "ln" },
            { "\\lg", "lg" },
            { "\\sin", "sin" },
            { "\\cos", "cos" },
            { "\\tan", "tan" },
            { "\\cot", "cot" },
            { "\\sec", "sec" },
            { "\\csc", "csc" },
            { "\\pi", "π" },
            { "\\infty", "∞" },
            { "\\to", "→" },
            { "\\geq", "≥" },
            { "\\leq", "≤" },
            { "\\neq", "≠" },
            { "\\approx", "≈" },
            { "^2", "²" },
            { "^3", "³" },
        };

        foreach (var kvp in replacements)
        {
            result = result.Replace(kvp.Key, kvp.Value);
        }

        return result;
    }
}
