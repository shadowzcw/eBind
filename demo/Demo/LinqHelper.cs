using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Rogrand.Common
{
    public class PageParameter
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int RecordCount { get; set; }
        public string OrderBy { get; set; }
        public bool IsAsc { get; set; }
        public int FromIndex { get; set; }
        public int ToIndex { get; set; }
    }

    public static class LinqHelper
    {        
        public static IEnumerable<T> GetPageList<T>(this IEnumerable<T> query, PageParameter parameters)
        {
            if (!String.IsNullOrEmpty(parameters.OrderBy))
            {
                if (parameters.OrderBy.IndexOf(',') <= -1 && !parameters.OrderBy.Contains(" "))
                {
                    query = query.DataSorting(parameters.OrderBy, parameters.IsAsc, true);
                }
                else
                {
                    var orderBys = parameters.OrderBy.Split(',');
                    for (var i = 0; i < orderBys.Length; i++)
                    {
                        var orderBy = orderBys[i].Trim();
                        var isAsc = !orderBy.ToLower().EndsWith("desc");
                        if (orderBy.IndexOf(' ') > -1)
                            orderBy = orderBy.Substring(0, orderBy.IndexOf(' '));
                        query = query.DataSorting(orderBy, isAsc, i == 0);
                    }
                }
            }

            if (parameters.FromIndex > 0 && parameters.ToIndex > 0)
            {
                parameters.RecordCount = query.Count();
                query = query.Skip(parameters.FromIndex - 1).Take(parameters.ToIndex - parameters.FromIndex + 1);
                return query;
            }

            parameters.RecordCount = query.Count();
            if (parameters.PageSize < 1)
                return query;

            if (parameters.PageIndex > 1 && parameters.PageSize > 0)
                query = query.Skip((parameters.PageIndex - 1) * parameters.PageSize).Take(parameters.PageSize);
            return query.Take(parameters.PageSize);
        }

        public static IEnumerable<T> DataSorting<T>(this IEnumerable<T> source, string orderBy, bool isAsc, bool isFirst)
        {
            var sortingDir = (isFirst ? "Order" : "Then") + (isAsc ? "By" : "ByDescending");
            ParameterExpression param = Expression.Parameter(typeof(T), orderBy);

            PropertyInfo pi = typeof(T).GetProperty(orderBy);
            Type[] types = new Type[2];
            types[0] = typeof(T);
            types[1] = pi.PropertyType;
            var lambda = Expression.Lambda(Expression.Property(param, orderBy), param);

            Expression expr = Expression.Call(typeof(Queryable), sortingDir, types, source.AsQueryable().Expression,
                                              lambda);
            IQueryable<T> query = source.AsQueryable().Provider.CreateQuery<T>(expr);
            return query;
        }
    }
}